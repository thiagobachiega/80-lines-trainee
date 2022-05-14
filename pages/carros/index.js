import { QueryClient, QueryClientProvider, useQuery, useMutation } from "react-query";

import { NovoCarro } from "../../components/carro_form";

const queryClient = new QueryClient()



export default function CarroForm () {
return(
    <QueryClientProvider client={queryClient}>
      <NovoCarro/>
    </QueryClientProvider>
)
}