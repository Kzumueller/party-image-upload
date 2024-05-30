import {SlideshowContextProvider} from "@/components/slideshow/SlideshowContextProvider";
import {SlideshowPanel} from "@/components/slideshow/SlideshowPanel";
import {SlideshowSubscriber} from "@/components/slideshow/SlideshowSubscriber";

export default function SlideshowPage() {
    return <SlideshowContextProvider>
        <SlideshowSubscriber />
        <SlideshowPanel />
    </SlideshowContextProvider>
}