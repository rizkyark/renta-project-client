import React, { useEffect, useState } from "react";
import Layout from "layout/main.jsx";
import styles from "styles/Vehicle.module.css";
import {} from "react-bootstrap-icons";
import Image from "next/image";
import { ChevronRight, StarFill } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import axios from "utilities/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "stores/action/vehicle";

export default function Vehicle() {
  const [category, setCategory] = useState([]);
  const locationData = useSelector((state) => state.vehicle.location);
  const router = useRouter();
  const data = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    getCategory();
    getLocationData();
  }, []);

  const getCategory = async () => {
    try {
      const result = await axios.get("/api/category");
      setCategory(result.data.data);
    } catch (error) {
      setCategory([]);
    }
  };

  const getLocationData = async () => {
    try {
      await dispatch(getLocation());
    } catch (error) {}
  };

  return (
    <Layout title="Vehicle">
      <section className={`row m-0 ${styles.searchContainer}`}>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <input
            type="text"
            placeholder="Vehicle name"
            className={styles.inputType}
            defaultValue={data.keyword}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <select
            name="cars"
            id="cars"
            className={styles.inputLocation}
            defaultValue={data.location}
          >
            <option value="">Location</option>
            {locationData.length > 0 ? (
              locationData.map((item) => {
                return (
                  <option value={item.locationId} key={item.locationId}>
                    {item.name}
                  </option>
                );
              })
            ) : (
              <></>
            )}
          </select>
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <input
            type="text"
            placeholder="Date"
            className={styles.inputDate}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            defaultValue={data.date}
          />
        </div>
        <div className={`col-sm-12 col-md-6 col-lg-3 pb-1 pe-1`}>
          <div className={styles.inputButton}>Search</div>
        </div>
      </section>
      {category.length > 0
        ? category.map((item) => {
            return (
              <section className={styles.popularContainer} key={item.typeId}>
                <div className={styles.titleContainer}>
                  <div className={styles.title}>{item.name}</div>
                  <div
                    className={styles.view}
                    onClick={() => {
                      router.push(`/vehicle/type/${item.typeId}`);
                    }}
                  >
                    View all <ChevronRight />
                  </div>
                </div>
                <div className={styles.itemContainer}>
                  <div
                    className={styles.item}
                    onClick={() => {
                      router.push(`/vehicle/details/s`);
                    }}
                  >
                    <Image
                      src={require("../../public/Background-1.png")}
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>Name</div>
                      <div className={styles.itemLocation}>Location</div>
                    </div>
                  </div>
                  <div
                    className={styles.item}
                    onClick={() => {
                      router.push(`/vehicle/details/s`);
                    }}
                  >
                    <Image
                      src={require("../../public/Background-1.png")}
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>Name</div>
                      <div className={styles.itemLocation}>Location</div>
                    </div>
                  </div>
                  <div
                    className={styles.item}
                    onClick={() => {
                      router.push(`/vehicle/details/s`);
                    }}
                  >
                    <Image
                      src={require("../../public/Background-1.png")}
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>Name</div>
                      <div className={styles.itemLocation}>Location</div>
                    </div>
                  </div>
                  <div
                    className={styles.item}
                    onClick={() => {
                      router.push(`/vehicle/details/s`);
                    }}
                  >
                    <Image
                      src={require("../../public/Item-Empty.webp")}
                      alt="item"
                      className={styles.itemImage}
                      width={250}
                      height={300}
                      unoptimized={true}
                    />
                    <div className={styles.itemDetail}>
                      <div className={styles.itemName}>Name</div>
                      <div className={styles.itemLocation}>Location</div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })
        : "Data Not Found"}
    </Layout>
  );
}
