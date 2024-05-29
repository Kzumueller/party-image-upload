import {PresentationContextProvider} from "@/components/presentation/PresentationContextProvider";
import { PresentationPanel } from "@/components/presentation/PresentationPanel";
import {PresentationSubscriber} from "@/components/presentation/PresentationSubscriber";

export default function PresentationPage() {
    return <PresentationContextProvider>
        <PresentationSubscriber />

        <PresentationPanel />
    </PresentationContextProvider>
}