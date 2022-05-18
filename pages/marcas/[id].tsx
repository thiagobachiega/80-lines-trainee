import { QueryClient, QueryClientProvider} from "react-query";
import { useRouter } from 'next/router'
import EditMarcaForm from "../../components/edit_marca_form";

const queryClient = new QueryClient()

const EditForm:React.FC = () => {

  const router = useRouter()
  const {id} = router.query

return(
    <QueryClientProvider client={queryClient}>
      <EditMarcaForm id={id}/>
    </QueryClientProvider>
)
}

export default EditForm