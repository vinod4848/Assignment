import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { AiOutlineDashboard } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { Layout, Menu, theme } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(true);
  const getUserData = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const tryShow = () => {
    setCollapsed(!collapsed);

    if (collapsed) {
      setShow(false);
      setShow2(true);
    } else {
      setShow(true);
      setShow2(false);
    }
  };
  const authState = useSelector((state) => state);
  debugger;
  const { isLoding, isError, isMessage, test } = authState.auth;
  // console.log(authState.auth.user.token, "authState");
  useEffect(() => {
    if (test && isMessage) {
      toast.success("Logout Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [test, isError, isLoding, isMessage]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (test) {
      console.log(test, "test");
      dispatch(logoutUser);
      navigate("/");
    }
  }, [dispatch, test, navigate]);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            {show && <span className="sm-logo">Get</span>}
            {show2 && <span className="gl-logo">Shopping</span>}
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "singnout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <AiOutlineDashboard className="fs-4" />,
              label: "Dashbord",
            },
            {
              key: "product",
              label: "Products",
              children: [
                {
                  key: "products",
                  label: "Add product",
                },
                {
                  key: "product-list",
                  label: "product List",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-3 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                tryShow();
              },
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoMdNotifications className="fs-4" />
              <span className="badge bg-danger rounded-circle p-1 position-absolute">
                2
              </span>
            </div>
            <div className="d-flex  gap-3 align-items-center">
              <div className="img">
                <img
                  width={32}
                  height={32}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLzi8P9Z8RNkDxO7TSfCTcMN3PkJKyG9rMJw&usqp=CAU"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{getUserData?.firstName}</h5>
                <p className="mb-0">{getUserData?.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                    onClick={logoutUser}
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
