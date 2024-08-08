interface ViewDriverProps {
    params: {
        certificateID: string;
    };
  }
const ViewCertificate: React.FC<ViewDriverProps>  = ({params}) => {
    return ( 
        <>
        {params.certificateID}
        </>
     );
}
 
export default ViewCertificate;