
import { Breadcrumb } from "./breadCrumb"

interface BannerProps {
    innerText?: string;
}

export default function Banner({innerText}: BannerProps): React.JSX.Element {
    return (
        <div className="h-40 w-full bg-gradient-to-r from-[#0362c4] via-[#0a417a] to-[#12283e] flex flex-col items-center justify-center">
                <h1 className="text-xl md:text-3xl font-extrabold text-center text-[#fefefe] py-4 tracking-tight drop-shadow-lg">
            {innerText}
        </h1>
        <Breadcrumb  />
        </div>
    )
}