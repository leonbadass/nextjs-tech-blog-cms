
import { Breadcrumb } from "./breadCrumb"

interface BannerProps {
    innerText?: string;
}

export default function Banner({innerText}: BannerProps): React.JSX.Element {
    return (
        <div className="h-64 w-full bg-gradient-to-r from-[#0362c4] via-[#0a417a] to-[#12283e] flex flex-col items-center justify-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-center text-[#fefefe] py-8 tracking-tight drop-shadow-lg">
            {innerText}
        </h1>
        <Breadcrumb  />
        </div>
    )
}