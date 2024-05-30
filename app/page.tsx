import {Col} from "antd";
import {UploadContextProvider} from "@/components/upload/UploadContextProvider";
import {UploadManager} from "@/components/upload/UploadManager";

export default function UploadPage() {

  return <UploadContextProvider>
    <Col>
      <UploadManager />
    </Col>
  </UploadContextProvider>
}
