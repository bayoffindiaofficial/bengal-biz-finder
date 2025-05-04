
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import BottomNavigation from "@/components/layout/BottomNavigation";
import { supabase } from "@/integrations/supabase/client";
import { getCategoryIcon } from "@/components/category/CategoryIcons";
import { toast } from "sonner";
import EditBusiness from "@/components/business/EditBusiness";
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  Pencil,
  Trash2,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const BusinessDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [business, setBusiness] = useState<any>(null);
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchUserAndBusiness = async () => {
      try {
        // Get current session
        const { data: sessionData } = await supabase.auth.getSession();
        if (sessionData.session) {
          setCurrentUser(sessionData.session.user);
        }

        // Fetch business details
        const { data: businessData, error: businessError } = await supabase
          .from("businesses")
          .select("*")
          .eq("id", id)
          .single();

        if (businessError) throw businessError;
        setBusiness(businessData);
        
        // Check if current user is owner
        if (sessionData.session && businessData.user_id === sessionData.session.user.id) {
          setIsOwner(true);
        }

        // Fetch business photos
        const { data: photosData, error: photosError } = await supabase
          .from("business_photos")
          .select("*")
          .eq("business_id", id);

        if (photosError) throw photosError;
        setPhotos(photosData || []);
      } catch (error: any) {
        toast.error(`Error loading business: ${error.message}`);
        navigate("/businesses");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndBusiness();
  }, [id, navigate]);

  const refreshBusiness = async () => {
    try {
      // Refetch business details
      const { data: businessData, error: businessError } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id)
        .single();

      if (businessError) throw businessError;
      setBusiness(businessData);

      // Refetch business photos
      const { data: photosData, error: photosError } = await supabase
        .from("business_photos")
        .select("*")
        .eq("business_id", id);

      if (photosError) throw photosError;
      setPhotos(photosData || []);
    } catch (error: any) {
      toast.error(`Error refreshing business: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!business || !isOwner) return;
    
    setIsDeleting(true);
    
    try {
      // Delete business (cascade will delete photos as well)
      const { error } = await supabase
        .from("businesses")
        .delete()
        .eq("id", business.id);
        
      if (error) throw error;
      
      toast.success("Business deleted successfully");
      navigate("/businesses");
    } catch (error: any) {
      toast.error(`Error deleting business: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };
  
  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-bengalbiz-background flex items-center justify-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-32 w-32 bg-gray-300 rounded-full"></div>
            <div className="h-8 w-64 bg-gray-300 rounded mt-4"></div>
            <div className="h-4 w-48 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>
      </>
    );
  }

  if (!business) {
    return (
      <>
        <div className="min-h-screen bg-bengalbiz-background">
          <Header showBackButton onBack={() => navigate(-1)} title="Business Not Found" />
          <div className="container mx-auto px-4 py-8 text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-gray-400" />
            <h2 className="mt-4 text-lg font-semibold">Business not found</h2>
            <p className="mt-2 text-gray-500">
              The business you're looking for doesn't exist or has been removed.
            </p>
            <button
              onClick={() => navigate("/businesses")}
              className="mt-4 bg-bengalbiz-primary text-white px-4 py-2 rounded-md hover:bg-bengalbiz-primary/90 transition-colors"
            >
              Browse Businesses
            </button>
          </div>
        </div>
        <BottomNavigation />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-bengalbiz-background">
        <Header showBackButton onBack={() => navigate(-1)} title={business.name} />

        <div className="container mx-auto px-4 py-6 pb-20">
          {/* Business Photos */}
          {photos.length > 0 ? (
            <div className="mb-6 overflow-x-auto whitespace-nowrap">
              <div className="flex space-x-4 py-2">
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo.url}
                    alt={`${business.name} - ${index + 1}`}
                    className="h-64 w-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6 bg-gray-200 h-64 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No photos available</p>
            </div>
          )}

          {/* Business Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Owner Actions */}
            {isOwner && (
              <div className="mb-4 flex justify-end space-x-2">
                <button
                  onClick={() => setShowEditSheet(true)}
                  className="flex items-center space-x-1 bg-bengalbiz-primary bg-opacity-10 text-bengalbiz-primary px-3 py-1 rounded-md hover:bg-opacity-20 transition-colors"
                >
                  <Pencil size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  className="flex items-center space-x-1 bg-red-50 text-red-500 px-3 py-1 rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            )}
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-bengalbiz-primary bg-opacity-10 rounded-full flex items-center justify-center mr-4">
                {getCategoryIcon(business.type)}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{business.name}</h1>
                <p className="text-gray-500">{business.type}</p>
              </div>
            </div>

            {business.description && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-600">{business.description}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-bengalbiz-primary mr-3 mt-1 shrink-0" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600">
                    {business.area}, {business.district}
                    {business.address && `, ${business.address}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Phone className="w-5 h-5 text-bengalbiz-primary mr-3 shrink-0" />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <a href={`tel:${business.phone}`} className="text-bengalbiz-primary">
                    {business.phone}
                  </a>
                </div>
              </div>

              {business.email && (
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-bengalbiz-primary mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href={`mailto:${business.email}`} className="text-bengalbiz-primary break-all">
                      {business.email}
                    </a>
                  </div>
                </div>
              )}

              {business.website && (
                <div className="flex items-center">
                  <Globe className="w-5 h-5 text-bengalbiz-primary mr-3 shrink-0" />
                  <div>
                    <h3 className="font-medium">Website</h3>
                    <a
                      href={business.website.startsWith('http') ? business.website : `https://${business.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bengalbiz-primary break-all"
                    >
                      {business.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <EditBusiness
        business={business}
        photos={photos}
        isOpen={showEditSheet}
        onClose={() => setShowEditSheet(false)}
        onSuccess={refreshBusiness}
      />
      
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Business</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this business? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-4 mt-4">
            <button 
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
            <button 
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      <BottomNavigation />
    </>
  );
};

export default BusinessDetail;
