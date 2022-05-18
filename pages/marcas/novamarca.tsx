import { QueryClient, QueryClientProvider} from "react-query";
import MarcaForm from "../../components/marca_form";

const queryClient = new QueryClient()

const EditForm:React.FC = () => {
return(
    <QueryClientProvider client={queryClient}>
      <MarcaForm/>
    </QueryClientProvider>
)
}

export default EditForm