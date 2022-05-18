import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";
import NovoCarro from "../../components/carro_form";


const queryClient = new QueryClient()

const CarroForm:React.FC = () => {
return(
    <QueryClientProvider client={queryClient}>
      <NovoCarro/>
    </QueryClientProvider>
)
}

export default CarroForm