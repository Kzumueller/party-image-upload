import {Col} from "antd";
import Title from "antd/es/typography/Title";
import {UploadContextProvider} from "@/components/upload/UploadContextProvider";
import {UploadManager} from "@/components/upload/UploadManager";

export default function UploadPage() {

  return <UploadContextProvider>
    <Col>
      <Title level={1} className="text-center">Bilder hochladen</Title>

      <UploadManager />
    </Col>
  </UploadContextProvider>
}
