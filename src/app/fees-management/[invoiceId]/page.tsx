interface ViewInvoiceProps {
  params: {
    invoiceId: string;
  };
}
const ViewInvoice: React.FC<ViewInvoiceProps> = ({ params }) => {
  return <>
    {params.invoiceId}
  </>;
};

export default ViewInvoice;
