import Link from "next/link";
import AddUser from "../components/AddUser";

const HomePage = () => {
  return (<>
      <AddUser/>
      <h1>Welcome to My "beloved" Library</h1>
      <Link href="/login">
        login
      </Link>
      <br/><br/>
      <Link href="/books">
        Books
      </Link>
        <br/><br/>
      <Link href="/authors">
        Authors
      </Link>
</>);};

export default HomePage;