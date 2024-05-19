import React, { ReactNode, useEffect } from "react";
import { Layout, Menu, Avatar } from "antd";
import { Link, Outlet } from "umi";
import { useLocation, useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

interface BasicLayoutProps {
  children: ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const currentUser = localStorage.getItem("user") || "";
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (location.pathname !== "/register" && location.pathname !== "/login") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [navigate]);

  return token ? (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Menu theme="dark" mode="horizontal" style={{ flex: 1 }}>
          <Menu.Item key="chat">
            <Link to="/chat">Chat</Link>
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            icon={<UserOutlined />}
            style={{ backgroundColor: "#87d068", marginRight: "10px" }}
            src={currentUser}
          />
          <span style={{ color: "white", marginRight: "20px" }}>
            {currentUser}
          </span>
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div style={{ background: "#fff", padding: 24, minHeight: 380 }}>
          <Outlet />
        </div>
      </Content>
    </Layout>
  ) : (
    <Outlet />
  );
};

export default BasicLayout;
