
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { businessTypes } from "@/data/businessTypes";
import { districts } from "@/data/districts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Upload, X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(3, { message: "Business name must be at least 3 characters" }),
  type: z.string().min(1, { message: "Please select a business type" }),
  description: z.string().optional(),
  phone: z.string().min(6, { message: "Phone number is required" }),
  email: z.string().email().optional().or(z.literal("")),
  website: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
  district: z.string().min(1, { message: "Please select a district" }),
  area: z.string().min(1, { message: "Area is required" }),
  address: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type EditBusinessProps = {
  business: any;
  photos: any[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const EditBusiness = ({ business, photos, isOpen, onClose, onSuccess }: EditBusinessProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>(photos.map(photo => photo.url));
  const [isUploading, setIsUploading] = useState(false);
  const [existingPhotoIds] = useState(new Set(photos.map(photo => photo.id)));
  const [deletedPhotoUrls, setDeletedPhotoUrls] = useState<string[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: business?.name || "",
      type: business?.type || "",
      description: business?.description || "",
      phone: business?.phone || "",
      email: business?.email || "",
      website: business?.website || "",
      district: business?.district || "",
      area: business?.area || "",
      address: business?.address || "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${Date.now()}_${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('business-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data } = supabase.storage
          .from('business-images')
          .getPublicUrl(filePath);

        setUploadedImages(prev => [...prev, data.publicUrl]);
      }

      toast.success("Images uploaded successfully");
    } catch (error: any) {
      toast.error(`Error uploading image: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    setUploadedImages(prev => prev.filter(url => url !== urlToRemove));
    setDeletedPhotoUrls(prev => [...prev, urlToRemove]);
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      // Update business data
      const { error: businessError } = await supabase
        .from('businesses')
        .update({
          name: data.name,
          type: data.type,
          description: data.description || null,
          phone: data.phone,
          email: data.email || null,
          website: data.website || null,
          district: data.district,
          area: data.area,
          address: data.address || null,
        })
        .eq('id', business.id);

      if (businessError) throw businessError;

      // Delete removed photos
      if (deletedPhotoUrls.length > 0) {
        const { error: deleteError } = await supabase
          .from('business_photos')
          .delete()
          .in('url', deletedPhotoUrls);

        if (deleteError) throw deleteError;
      }

      // Add new photos
      const newPhotos = uploadedImages.filter(url => !photos.some(photo => photo.url === url));
      if (newPhotos.length > 0) {
        const photosToInsert = newPhotos.map(url => ({
          business_id: business.id,
          url,
        }));

        const { error: photosError } = await supabase
          .from('business_photos')
          .insert(photosToInsert);

        if (photosError) throw photosError;
      }

      toast.success("Business updated successfully!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Edit Business</SheetTitle>
          <SheetDescription>
            Make changes to your business information.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name*</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                        placeholder="Enter business name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type*</FormLabel>
                    <FormControl>
                      <select
                        {...field}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                      >
                        <option value="">Select business type</option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                        placeholder="Describe your business"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                          placeholder="Enter phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="email"
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                          placeholder="Enter email address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Website URL</FormLabel>
                    <FormControl>
                      <input
                        {...field}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                        placeholder="https://example.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <h3 className="text-sm font-medium pt-2">Location Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District*</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                        >
                          <option value="">Select district</option>
                          {districts.map((district) => (
                            <option key={district} value={district}>
                              {district}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Area/Locality*</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                          placeholder="Enter area or locality"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Address</FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bengalbiz-primary"
                        placeholder="Enter full address"
                        rows={2}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Photos
                </label>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="edit-images"
                    multiple
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                  
                  <label htmlFor="edit-images" className="cursor-pointer block">
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-6 h-6 animate-spin text-bengalbiz-primary mb-1" />
                        <span className="text-xs text-gray-500">Uploading...</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-6 h-6 text-gray-400 mb-1" />
                        <span className="text-xs font-medium text-gray-900">
                          Click to upload photos
                        </span>
                      </div>
                    )}
                  </label>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-xs font-medium mb-2">Photos ({uploadedImages.length})</p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {uploadedImages.map((url, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={url} 
                            alt={`Uploaded ${index + 1}`} 
                            className="h-16 w-full object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(url)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="pt-4 flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-bengalbiz-primary text-white px-4 py-2 rounded-md font-medium hover:bg-bengalbiz-primary/90 transition-colors"
                  disabled={isLoading || isUploading}
                >
                  {isLoading ? "Updating..." : "Update Business"}
                </button>
              </div>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default EditBusiness;
