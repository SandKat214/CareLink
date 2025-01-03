import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider } from "@chakra-ui/react"
import App from "./App"
import theme from "./utils/theme"
import { AuthContextProvider } from "./context/AuthContext"

// Query client
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</QueryClientProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
