"use client";

import { IArticle } from "@/stores/Article-store/Articles-store";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import HtmlToPdf from "../ConvertHtmlToPdf";

Font.register({
  family: "Amiri",
  fonts: [
    {
      src: "/fonts/arabic/Amiri-Regular.ttf",
      fontWeight: "normal",
    },
    {
      src: "/fonts/arabic/Amiri-Bold.ttf",
      fontWeight: "bold",
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Amiri",
    direction: "rtl", // RTL support
  },
  section: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 350,
    backgroundColor: "#1C6EA4",
  },
  tages: {
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 10,
  },
  tage: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#1C6EA4",
    fontSize: 10,
    color: "#FFFFFF",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    textAlign: "right",
  },
  dateContainer: {
    fontSize: 15,
    marginHorizontal: 10,
    textAlign: "left",
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  category: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
    fontSize: 12,
    textAlign: "center",
    color: "#ffffff",
    backgroundColor: "#1C6EA4",
  },
  spaceBetweenContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row-reverse",
    alignItems: "flex-start",
    marginBottom: 10,
  },
});

// Main PDF Component
export const ArticlePdf = ({ article }: { article: IArticle }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        <View style={styles.spaceBetweenContainer}>
          <View>
            <Text style={styles.title}>{article.title}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{article.category}</Text>
            </View>
          </View>
          <Text style={styles.dateContainer}>
            {new Date(article.scheduled || "").toLocaleDateString("ar-EG", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>

        <View style={[styles.container, { width: "100%" }]}>
          <Image src={article.cover.trim()} style={styles.image} />
          <View style={styles.tages}>
            {article?.tags?.map((tag, i) => (
              <Text key={i} style={styles.tage}>
                {tag}
              </Text>
            ))}
          </View>
        <View style={{ fontFamily: "Amiri" , width: '100%'}}>{HtmlToPdf({ html: article.richText })}</View>
        </View>

      </Page>
    </Document>
  );
};
