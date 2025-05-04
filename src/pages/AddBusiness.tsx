
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { businessTypes } from "@/data/businessTypes";
import { districts } from "@/data/districts";
import { toast } from "sonner";
import { getCategoryIcon } from "@/components/category/CategoryIcons";
import { Upload, X, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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

const AddBusiness = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setUser(data.session.user);
      } else {
        setShowLoginDialog(true);
      }
    };
    
    checkUser();
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      description: "",
      phone: "",
      email: "",
      website: "",
      district: "",
      area: "",
      address: "",
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
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    setIsLoading(true);

    try {
      // Insert business data
      const { data: businessData, error: businessError } = await supabase
        .from('businesses')
        .insert({
          name: data.name,
          type: data.type,
          description: data.description || null,
          phone: data.phone,
          email: data.email || null,
          website: data.website || null,
          district: data.district,
          area: data.area,
          address: data.address || null,
          user_id: user.id
        })
        .select('id')
        .single();

      if (businessError) throw businessError;

      // Add business photos if any
      if (uploadedImages.length > 0) {
        const photosToInsert = uploadedImages.map(url => ({
          business_id: businessData.id,
          url,
        }));

        const { error: photosError } = await supabase
          .from('business_photos')
          .insert(photosToInsert);

        if (photosError) throw photosError;
      }

      toast.success("Business added successfully!");
      navigate(`/business/${businessData.id}`);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    navigate("/auth");
  };

  if (isLoading) {
    return (
      <>
        <div className="min-h-screen bg-bengalbiz-background flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-bengalbiz-primary" />
            <h2 className="text-xl font-semibold">Adding your business...</h2>
            <p className="text-gray-500 mt-2">Please wait while we process your information.</p>
          </div>
        </div>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header showBackButton onBack={() => navigate(-1)} title="Add Your Business" />

        <div className="container mx-auto px-4 py-6 mb-16">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Business Information</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                          rows={4}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                
                <h3 className="text-lg font-medium pt-4">Location Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="images"
                      multiple
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                    
                    <label htmlFor="images" className="cursor-pointer block">
                      {isUploading ? (
                        <div className="flex flex-col items-center">
                          <Loader2 className="w-8 h-8 animate-spin text-bengalbiz-primary mb-2" />
                          <span className="text-sm text-gray-500">Uploading...</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="w-8 h-8 text-gray-400 mb-2" />
                          <span className="text-sm font-medium text-gray-900">
                            Click to upload photos
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            PNG, JPG, WEBP up to 5MB
                          </span>
                        </div>
                      )}
                    </label>
                  </div>
                  
                  {uploadedImages.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Uploaded Photos ({uploadedImages.length})</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {uploadedImages.map((url, index) => (
                          <div key={index} className="relative group">
                            <img 
                              src={url} 
                              alt={`Uploaded ${index + 1}`} 
                              className="h-24 w-full object-cover rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(url)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    className="bg-bengalbiz-primary text-white w-full py-3 rounded-md font-medium hover:bg-bengalbiz-primary/90 transition-colors"
                    disabled={isLoading || isUploading}
                  >
                    {isLoading ? "Adding Business..." : "Add Business"}
                  </button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <BottomNavigation />
      
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to add a business listing.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowLoginDialog(false)}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-bengalbiz-primary text-white rounded-md hover:bg-bengalbiz-primary/90"
              onClick={handleLogin}
            >
              Log In
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddBusiness;
