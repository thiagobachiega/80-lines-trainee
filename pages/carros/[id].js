import { QueryClient, QueryClientProvider} from "react-query";
import { useRouter } from 'next/router'
import { EditarCarro } from "../../components/edit_form";

const queryClient = new QueryClient()

export default function CarroForm () {

  const router = useRouter()
  const {id} = router.query

return(
    <QueryClientProvider client={queryClient}>
        <EditarCarro id={id}/>
    </QueryClientProvider>
)
}
