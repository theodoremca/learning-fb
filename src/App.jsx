import { AuthPage } from "./page/AuthPage";
import { AuthProvider } from "./Provider";

function App() {
  return (
    <AuthProvider>
      <AuthPage />;
    </AuthProvider>
  );
}

export default App;
