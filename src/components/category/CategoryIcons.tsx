
import { 
  Store, Utensils, ShoppingCart, Smartphone, Tv, Stethoscope, Building2, 
  School, GraduationCap, BookOpen, Scissors, Leaf, Dumbbell, Hotel, Scale, 
  UserRound, Plug, Hammer, Wrench, Plane, Home, Shield, Landmark, CreditCard, 
  Gem, Ellipsis 
} from "lucide-react";

type IconProps = {
  className?: string;
  size?: number;
};

export const getCategoryIcon = (category: string, props: IconProps = {}) => {
  const iconProps = { 
    size: props.size || 24, 
    className: props.className || "text-bengalbiz-primary" 
  };

  switch (category) {
    case "Restaurant":
      return <Utensils {...iconProps} />;
    case "Grocery Store":
      return <ShoppingCart {...iconProps} />;
    case "Clothing Store":
      return <Store {...iconProps} />;
    case "Electronics":
      return <Smartphone {...iconProps} />;
    case "Home Appliances":
      return <Tv {...iconProps} />;
    case "Medical Store":
      return <Stethoscope {...iconProps} />;
    case "Hospital":
      return <Building2 {...iconProps} />;
    case "School":
      return <School {...iconProps} />;
    case "College":
      return <GraduationCap {...iconProps} />;
    case "Coaching Center":
      return <BookOpen {...iconProps} />;
    case "Salon":
      return <Scissors {...iconProps} />;
    case "Spa":
      return <Leaf {...iconProps} />; // Replaced Spa with Leaf icon
    case "Gym":
      return <Dumbbell {...iconProps} />;
    case "Hotel":
      return <Hotel {...iconProps} />;
    case "Lawyer":
      return <Scale {...iconProps} />;
    case "Doctor":
      return <UserRound {...iconProps} />;
    case "Electrician":
      return <Plug {...iconProps} />;
    case "Plumber":
      return <Wrench {...iconProps} />;
    case "Carpenter":
      return <Hammer {...iconProps} />;
    case "Travel Agency":
      return <Plane {...iconProps} />;
    case "Real Estate":
      return <Home {...iconProps} />;
    case "Insurance":
      return <Shield {...iconProps} />;
    case "Bank":
      return <Landmark {...iconProps} />;
    case "ATM":
      return <CreditCard {...iconProps} />;
    case "Jewellery":
      return <Gem {...iconProps} />;
    default:
      return <Ellipsis {...iconProps} />;
  }
};
