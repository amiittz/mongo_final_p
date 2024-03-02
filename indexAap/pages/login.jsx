import Link from "next/link";
import TryLogin from "../components/TryLogin";
const LoginPage = () => {
  return (<>
    <Link href="/">Home</Link><br/><br/>
    <h1>login</h1>
    <TryLogin/>
</>);};

export default LoginPage;