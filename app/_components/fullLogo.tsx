import { LogoDarkIcon, LogoLightIcon } from "@/icons/index"
import { combine } from "@/utils/combineClassnames"

type FullLogoProps = {
  className?: string
}
export default function FullLogo({ className="" }: FullLogoProps) {

  return (
    <>
      <LogoLightIcon className={combine("dark:hidden", className)}/>
      <LogoDarkIcon className={combine("hidden dark:block", className)}/>
    </>
  )
}