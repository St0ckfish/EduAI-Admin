interface ViewDriverProps {
    params: {
        participationID: string;
    };
  }

const viewParticipation: React.FC<ViewDriverProps>  = ({params}) => {
    return ( 
        <>
        {params.participationID}
        </>
     );
}
 
export default viewParticipation;