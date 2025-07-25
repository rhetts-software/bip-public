import {
  TbBriefcase,
  TbFiles,
  TbFileText,
  TbFlag,
  TbHelp,
  TbHome,
  TbLayoutDashboard,
  TbListDetails,
  TbSpeakerphone,
  TbUser,
  TbUsers,
  TbUserStar,
  TbTrash,
  TbSettings,
} from "react-icons/tb";

export default function ResolvableIcon({
  icon,
  size,
}: {
  icon: string;
  size: number;
}) {
  switch (icon.toLowerCase()) {
    case "home":
      return <TbHome size={size}></TbHome>;
    case "speakerphone":
      return <TbSpeakerphone size={size}></TbSpeakerphone>;
    case "files":
      return <TbFiles size={size}></TbFiles>;
    case "help":
      return <TbHelp size={size}></TbHelp>;
    case "layoutdashboard":
      return <TbLayoutDashboard size={size}></TbLayoutDashboard>;
    case "users":
      return <TbUsers size={size}></TbUsers>;
    case "user":
      return <TbUser size={size}></TbUser>;
    case "userstar":
      return <TbUserStar size={size}></TbUserStar>;
    case "listdetails":
      return <TbListDetails size={size}></TbListDetails>;
    case "filetext":
      return <TbFileText size={size}></TbFileText>;
    case "briefcase":
      return <TbBriefcase size={size}></TbBriefcase>;
    case "flag":
      return <TbFlag size={size}></TbFlag>;
    case "trash":
      return <TbTrash size={size}></TbTrash>;
    case "settings":
      return <TbSettings size={size}></TbSettings>;
  }
}
