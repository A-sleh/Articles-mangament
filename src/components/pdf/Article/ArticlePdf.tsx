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
} from "@react-pdf/renderer";
import HtmlToPdf from "../ConvertHtmlToPdf";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    width: "100%",
    height: "100%",
  },
  section: {
    display: "flex",
    gap: 10,
    flexDirection: "row",
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
    backgroundColor: '#1C6EA4',
    zIndex: 100
  },
  tages: {
    display: "flex",
    flexDirection: "row",
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
  },
  dateContainer: {
    fontSize: 15,
    marginHorizontal: 10,
  },
  categoryContainer: {
    display: "flex",
    flexDirection: "row",
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
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
});

// Create Document Component
export const ArticlePdf = ({ article }: { article: IArticle }) => {
  alert(article.cover)
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
            {new Date(article.scheduled).toDateString()}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.container}>
            <Image src={article.cover.trim()} style={styles.image} />
            <View style={styles.tages}>
              {article?.tags?.map((tage) => (
                <Text style={styles.tage}>{tage}</Text>
              ))}
            </View>
          </View>

          {HtmlToPdf({ html: article.richText })}
        </View>
      </Page>
    </Document>
  );
};
