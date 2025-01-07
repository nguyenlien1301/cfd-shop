import FormAccount from "@/pages/DashboardPage/FormAccount";
import { useSelector } from "react-redux";

const AccountPage = () => {

    const { profile, loading } = useSelector((store) => store.auth);

    if (!profile || loading.getProfile) return null;

    return (
        profile && <FormAccount profile={profile} />
    );
};

export default AccountPage;
