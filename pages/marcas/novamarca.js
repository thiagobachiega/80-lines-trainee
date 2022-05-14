import { QueryClient, QueryClientProvider} from "react-query";
import { useRouter } from 'next/router'
import MarcaForm from "../../components/marca_form";

const queryClient = new QueryClient()

export default function EditForm () {

  const router = useRouter()
  const {id} = router.query

return(
    <QueryClientProvider client={queryClient}>
      <MarcaForm id={id}/>
    </QueryClientProvider>
)
}