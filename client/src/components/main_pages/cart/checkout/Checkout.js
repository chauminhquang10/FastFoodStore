import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../../GlobalState";

import "../Cart.css";
import axios from "axios";
import PaypalButton from "../PayPalButton";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { Button } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import "./Checkout.css";
import Divider from "@material-ui/core/Divider";

const Checkout = () => {
  const products = [
    { name: "Product 1", desc: "A nice thing", price: "$9.99" },
    { name: "Product 2", desc: "Another thing", price: "$3.45" },
    { name: "Product 3", desc: "Something else", price: "$6.51" },
    { name: "Product 4", desc: "Best thing of all", price: "$14.11" },
    { name: "Shipping", desc: "", price: "Free" },
  ];
  const addresses = [
    "1 Material-UI Drive",
    "Reactville",
    "Anytown",
    "99999",
    "USA",
  ];
  const payments = [
    { name: "Card type", detail: "Visa" },
    { name: "Card holder", detail: "Mr John Smith" },
    { name: "Card number", detail: "xxxx-xxxx-xxxx-1234" },
    { name: "Expiry date", detail: "04/2024" },
  ];

  const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    layout: {
      width: "auto",
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: 600,
        marginLeft: "auto",
        marginRight: "auto",
      },
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
    paper: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3),
      },
    },
  }));

  const classes = useStyles();

  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;

  const [token] = state.token;

  const [date, setDate] = React.useState(new Date());

  const [user, setUser] = state.userAPI.user;

  const [callback, setCallback] = state.productsAPI.callback;

  const [discounts, setDiscounts] = state.discountsAPI.discounts;

  // discount chứa mã giảm giá
  const [chosenDiscount, setChosenDiscount] = useState(null);

  //hiển thị giá trị giảm giá
  const [reduceDiscount, setReduceDiscount] = useState(0);

  //tạm tổng tiền khởi tạo bằng 0
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
      checkValidDiscount(total);
    };
    const checkValidDiscount = (total) => {
      let currentDate = moment(new Date()).format("DD.MM.YYYY");
      if (discounts) {
        discounts.forEach((discount) => {
          let discountExpireTime = moment(new Date(discount.expireTime)).format(
            "DD.MM.YYYY"
          );

          if (currentDate <= discountExpireTime) {
            if (total >= discount.minimumValue) {
              if (reduceDiscount < discount.discountValue) {
                setReduceDiscount(discount.discountValue);
                setChosenDiscount(discount);
              }
            }
          }
        });
      }
    };
    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/add_cart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  // tăng giá trị số lượng của sản phẩm
  const incrementEvent = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    setCart([...cart]);
    setReduceDiscount(0);
    setChosenDiscount(null);
    addToCart(cart);
  };

  // giảm giá trị số lượng của sản phẩm
  const decreamentEvent = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });
    setCart([...cart]);
    setReduceDiscount(0);
    setChosenDiscount(null);
    addToCart(cart);
    // việc thêm hàm addToCart này là để đồng bộ database
    // ví dụ như remove 1 sản phẩm thì nó mất khỏi (state) card  chứ k mất khỏi thuộc tính card của user trong database
    // card được dùng gián tiếp chứ k trực tiếp
  };

  // xóa sản phẩm khỏi giỏ hàng
  const removeEvent = (id) => {
    if (
      window.confirm("Are you sure to remove this product from your cart ?")
    ) {
      cart.forEach((product, index) => {
        if (product._id === id) {
          cart.splice(index, 1);
        }
      });
    }
    setCart([...cart]);
    setReduceDiscount(0);
    setChosenDiscount(null);
    addToCart(cart);
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    // gửi mail confirm đơn hàng

    const { email, name } = user;
    const { country_code } = address;
    var currentDate = new Date().toLocaleString();

    await axios.post(
      "/user/confirmMail",
      { email, name, country_code, paymentID, cart, currentDate },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    setCallback(!callback);

    window.location.href = "/ThankYou";
  };

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: "900px", backgroundColor: "#f9f9f9" }}>
        {" "}
        <h1 style={{ paddingTop: "5rem", fontSize: "60px" }}>Cart Emty</h1>
      </div>
    );
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Order summary
          </Typography>
          <List disablePadding>
            {cart.map((product) => (
              <ListItem className={classes.listItem} key={product.title}>
                <ListItemText
                  style={{ textTransform: "capitalize" }}
                  primary={product.title + " x " + product.quantity}
                />
                <Typography variant="body2">
                  {product.price * product.quantity}$
                </Typography>
              </ListItem>
            ))}
            <Divider />
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography className="Line" text variant="subtitle1">
                {total}$
              </Typography>
            </ListItem>
            <ListItem className={classes.listItem}>
              <ListItemText />
              <Typography className={classes.total} text variant="subtitle1">
                {(total - (total * reduceDiscount) / 100).toFixed(0)}$(-
                {reduceDiscount}%)
              </Typography>
            </ListItem>
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping
              </Typography>
              <Typography gutterBottom>{user.name}</Typography>
              <Typography gutterBottom>{user.email}</Typography>
            </Grid>
            <Grid item container direction="column" xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Payment details
              </Typography>
              <Grid container>
                <React.Fragment>
                  <Grid item xs={6}>
                    <Typography>Payment Type</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>PayPal</Typography>
                  </Grid>
                  <Grid
                    style={{ marginBottom: "5%", paddingTop: "4px" }}
                    item
                    xs={6}
                  >
                    <Typography>Create Date</Typography>
                  </Grid>
                  <Grid
                    style={{ marginBottom: "5%", paddingTop: "4px" }}
                    item
                    xs={6}
                  >
                    <Typography>{date.toISOString().substr(0, 10)}</Typography>
                  </Grid>
                </React.Fragment>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <PaypalButton
                total={(total - (total * reduceDiscount) / 100).toFixed(0)}
                tranSuccess={tranSuccess}
              ></PaypalButton>
            </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
    </main>
    // <div style={{ backgroundColor: "#f9f9f9" }}>
    //   <h1 style={{ paddingTop: "5rem", fontSize: "60px" }}>Cart</h1>
    //   <TableContainer style={{ backgroundColor: "#f9f9f9" }} component={Paper}>
    //     <Table className={classes.table} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell
    //             style={{ borderRightColor: "#f9f9f9" }}
    //             colSpan={2}
    //           ></TableCell>
    //           <TableCell style={{ borderRightColor: "#f9f9f9" }} align="center">
    //             <Typography>Name</Typography>
    //           </TableCell>
    //           <TableCell style={{ borderRightColor: "#f9f9f9" }} align="center">
    //             <Typography>Price</Typography>
    //           </TableCell>
    //           <TableCell style={{ borderRightColor: "#f9f9f9" }} align="center">
    //             <Typography>Quantity</Typography>
    //           </TableCell>
    //           <TableCell align="center">
    //             <Typography>Total</Typography>
    //           </TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         {cart.map((product) => (
    //           <TableRow key={product.name}>
    //             <TableCell
    //               style={{ borderRightColor: "#f9f9f9" }}
    //               align="center"
    //             >
    //               <HighlightOffIcon
    //                 fontSize="large"
    //                 color="disabled"
    //                 onClick={() => removeEvent(product._id)}
    //               />
    //             </TableCell>
    //             <TableCell
    //               style={{ borderRightColor: "#f9f9f9" }}
    //               component="th"
    //               scope="row"
    //             >
    //               <CardMedia
    //                 className={classes.media}
    //                 image={product.image.url}
    //               />
    //             </TableCell>
    //             <TableCell
    //               style={{ borderRightColor: "#f9f9f9" }}
    //               align="center"
    //             >
    //               <Typography>{product.title}</Typography>
    //             </TableCell>
    //             <TableCell
    //               style={{ borderRightColor: "#f9f9f9" }}
    //               align="center"
    //             >
    //               <Typography>{product.price}&nbsp;$</Typography>
    //             </TableCell>
    //             <TableCell
    //               width="20%"
    //               align="center"
    //               style={{ borderRightColor: "#f9f9f9" }}
    //             >
    //               <Typography>
    //                 <i
    //                   onClick={() => decreamentEvent(product._id)}
    //                   class="fas fa-minus"
    //                 ></i>
    //                 <span>&nbsp;&nbsp;{product.quantity}&nbsp;&nbsp;</span>
    //                 <i
    //                   onClick={() => incrementEvent(product._id)}
    //                   class="fas fa-plus"
    //                 ></i>
    //               </Typography>
    //             </TableCell>
    //             <TableCell align="center">
    //               <Typography>
    //                 {product.price * product.quantity}&nbsp;$
    //               </Typography>
    //             </TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    //   <TableContainer style={{ backgroundColor: "#f9f9f9" }} component={Paper}>
    //     <Table className={classes.smalltable} aria-label="simple table">
    //       <TableHead>
    //         <TableRow>
    //           <TableCell>Total</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
    //         <TableRow>
    //           <TableCell align="left">
    //             <Typography>Temporary Total: {total}$</Typography>
    //           </TableCell>
    //         </TableRow>
    //         {reduceDiscount !== 0 && (
    //           <TableRow>
    //             <TableCell colSpan={6} style={{ justifyContent: "flex-end" }}>
    //               <Typography>
    //                 Reduce Amount:&nbsp;
    //                 {((total * reduceDiscount) / 100).toFixed(0)}$
    //               </Typography>
    //             </TableCell>
    //           </TableRow>
    //         )}
    //         <TableRow>
    //           <TableCell align="left">
    //             <Typography>
    //               Official Total:&nbsp;
    //               {(total - (total * reduceDiscount) / 100).toFixed(0)}$
    //             </Typography>
    //           </TableCell>
    //         </TableRow>
    //         <TableRow>
    //           <TableCell align="center">
    //             <Button fullWidth color="primary">
    //               <Link to="/Checkout">Checkout</Link>
    //             </Button>
    //
    //           </TableCell>
    //         </TableRow>
    //       </TableBody>
    //     </Table>
    //   </TableContainer>
    // </div>
  );
};

export default Checkout;
