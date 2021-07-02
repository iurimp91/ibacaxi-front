import { useHistory } from "react-router-dom";

export default function NotFound() {
    const history = useHistory();
    history.push("/");
    return null;
}
