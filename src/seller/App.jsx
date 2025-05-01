import LoginCabang from "./seller/LoginCabang";
import SellerDashboard from "./seller/SellerDashboard";

const [user, setUser] = useState(null);

<Route path="/seller/login" element={<LoginCabang onLogin={setUser} />} />
{user && <Route path="/seller/dashboard" element={<SellerDashboard user={user} />} />}
