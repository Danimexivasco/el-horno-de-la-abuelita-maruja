import Image from "next/image";
import { MoonIcon } from "./moon";
import { SunIcon } from "./sun";
import { Logo } from "./logo";
import FullLogoDark from "@/public/logo_dark.svg";
import FullLogoLight from "@/public/logo_light.svg";
import { CakeIcon } from "./cake";
import { DashboardIcon } from "./dashboard";
import { GoogleIcon } from "./google";
import { SignOutIcon } from "./signOut";
import { BackIcon } from "./back";
import { TrashIcon } from "./trash";
import { RightArrowIcon } from "./rightArrow";
import { UserIcon } from "./user";
import { CartIcon } from "./cart";
import { InstagramIcon } from "./instagram";
import { YoutubeIcon } from "./youtube";
import { GuaranteeIcon } from "./guarantee";
import { LensIcon } from "./lens";
import { CrossIcon } from "./cross";
import { FilterIcon } from "./filter";
import { GlutenIcon } from "./gluten";
import { NutsIcon } from "./nuts";
import { PeanutsIcon } from "./peanuts";
import { EggsIcon } from "./eggs";
import { MilkIcon } from "./milk";
import { MustardIcon } from "./mustard";
import { SesameIcon } from "./sesame";
import { SoyIcon } from "./soy";
import { NoResultIcon } from "./noResult";
import { MarkerIcon } from "./marker";

export type IconProps = {
  className?: string
  [prop: string]: any
};

const LogoIcon = ({ className }: IconProps) => <Logo className={className}/>;

const LogoDarkIcon = ({ className }: IconProps) => (
  <Image
    src={FullLogoDark}
    alt="Logo"
    className={className}
    priority
  />
);

const LogoLightIcon = ({ className }: IconProps) => (
  <Image
    src={FullLogoLight}
    alt="Logo"
    className={className}
    priority
  />
);

export {
  MoonIcon,
  SunIcon,
  LogoIcon,
  LogoDarkIcon,
  LogoLightIcon,
  CakeIcon,
  DashboardIcon,
  GoogleIcon,
  SignOutIcon,
  BackIcon,
  TrashIcon,
  RightArrowIcon,
  UserIcon,
  CartIcon,
  InstagramIcon,
  YoutubeIcon,
  GuaranteeIcon,
  LensIcon,
  CrossIcon,
  FilterIcon,
  NutsIcon,
  GlutenIcon,
  PeanutsIcon,
  EggsIcon,
  MilkIcon,
  MustardIcon,
  SesameIcon,
  SoyIcon,
  NoResultIcon,
  MarkerIcon
};