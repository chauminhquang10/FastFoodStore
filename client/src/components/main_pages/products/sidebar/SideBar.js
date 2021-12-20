import React, { useState, useContext } from "react";
import "./SideBar.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { GlobalState } from "../../../../GlobalState";

const SideBar = ({ setProductsPrice, setIsProductsPriceLower }) => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = state.productsAPI.category;
  const [search, setSearch] = state.productsAPI.search;
  const [sort, setSort] = state.productsAPI.sort;
  const [currentBtnName, setCurrentBtnName] = useState("All Products");

  const [checked, setChecked] = React.useState(0);

  const handleChange = (event) => {
    if (event.target.id === checked) {
      setChecked("");
      setProductsPrice("0");
      setIsProductsPriceLower(false);
    } else {
      setChecked(event.target.id);
      switch (event.target.id) {
        case "1":
          setProductsPrice("50");
          setIsProductsPriceLower(true);
          break;
        case "2":
          setProductsPrice("51");
          setIsProductsPriceLower(false);
          break;
        case "3":
          setIsProductsPriceLower(false);
          setProductsPrice("201");
          break;
      }
    }
  };

  const [age, setAge] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChangeBox = (event) => {
    setSort(event.target.value);
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOnClick = (event) => {
    const { id, value } = event.target;
    setCurrentBtnName(value);
    if (id) {
      setCategory("category=" + id);
    } else {
      setCategory("");
    }
    setSearch("");
  };
  return (
    <>
      <div className="side_bar_container">
        <div className="side_bar_header">Danh Mục</div>
        <ul className="sidebar">
          <button
            value="All Products"
            id=""
            className={
              currentBtnName === "All Products"
                ? "btn-sidebar active"
                : "btn-sidebar"
            }
            onClick={handleOnClick}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              value={category.name}
              id={category._id}
              className={
                category.name === currentBtnName
                  ? "btn-sidebar active"
                  : "btn-sidebar"
              }
              onClick={handleOnClick}
            >
              {category.name}
            </button>
          ))}
        </ul>
        <ul className="sidebar">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked === "1"}
                  id="1"
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  defaultChecked
                />
              }
              label="<= 50.000 VNĐ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="2"
                  checked={checked === "2"}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="> 50.000 VNĐ"
            />
            <FormControlLabel
              control={
                <Checkbox
                  id="3"
                  checked={checked === "3"}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="> 200.000 VNĐ"
            />
          </FormGroup>
        </ul>
        <ul className="sidebar">
          <FormControl sx={{ m: 0, minWidth: 120 }}>
            <InputLabel id="demo-controlled-open-select-label">
              Sắp Xếp Theo
            </InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={sort}
              label="Sắp Xếp Theo"
              onChange={handleChangeBox}
            >
              <MenuItem value="sort=createdAt">Cũ Nhất</MenuItem>
              <MenuItem value="sort=-createdAt">Mới Nhất</MenuItem>
              <MenuItem value="sort=-sold">Mua Nhiều Nhất</MenuItem>
              <MenuItem value="sort=sold">Mua Ít Nhất</MenuItem>
            </Select>
          </FormControl>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
