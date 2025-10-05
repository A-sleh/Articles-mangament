import React from "react";
import { Text, View, StyleSheet, Link, Font } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

type IListContext = {
  type: string;
  count?: number;
};

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
  ol: { marginBottom: 8, paddingLeft: 14, display: "flex", flexDirection: "column", width: "100%" },
  ul: { marginBottom: 8, paddingLeft: 14, display: "flex", flexDirection: "column", width: "100%" },
  li: { marginBottom: 4, padding: 15 },
  listItemMarker: { width: 14, fontSize: 12 },
  text: { },
  strong: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecoration: "underline" },
  link: { color: "blue", textDecoration: "underline" },
  todoContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: { width: 10, height: 10, borderWidth: 1, borderColor: "#000", marginRight: 6 },
  checkboxChecked: { backgroundColor: "#000" },
  todoText: { flex: 1 },
  // Added heading styles
  h1: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  h2: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  h3: { fontSize: 20, fontWeight: "bold", marginBottom: 6 },
  h4: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  h5: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  h6: { fontSize: 14, fontWeight: "bold", marginBottom: 4 },
});

const withFont = (style: any = {}) => [style, { fontFamily: "Amiri" }];

function renderNode(node: any, index: number, listContext: IListContext = {} as IListContext) {
  if (typeof node === "string") {
    return <Text key={index} style={withFont(styles.text)}>{node}</Text>;
  }

  if (node.type === "text") {
    return <Text key={index} style={withFont(styles.text)}>{node.data}</Text>;
  }

  if (node.type === "tag") {
    const children = node.children
      ? node.children.map((child: any, i: number) => renderNode(child, i, listContext))
      : null;

    switch (node.name) {
      case "p":
        return <Text key={index} style={withFont(styles.text)}>{children} </Text>;
      case "strong":
      case "b":
        return <Text key={index} style={withFont(styles.strong)}>{children} </Text>;
      case "i":
      case "em":
        return <Text key={index} style={withFont(styles.italic)}>{children} </Text>;
      case "u":
        return <Text key={index} style={withFont(styles.underline)}>{children} </Text>;
      case "a":
        return <Link key={index} src={node.attribs.href} style={withFont(styles.link)}>{children} </Link>;
      case "ol": {
        let count = 1;
        const newContext = { ...listContext, type: "ol" };
        return (
          <View key={index} style={withFont(styles.ol)}>
            {node.children.map((child: any, i: number) => child.name === "li" ? renderNode(child, i, { ...newContext, count: count++ }) : null)}
          </View>
        );
      }
      case "ul": {
        return (
          <View key={index} style={withFont(styles.ul)}>
            {node.children.map((child: any, i: number) => child.name === "li" ? renderNode(child, i, { type: "ul" }) : null)}
          </View>
        );
      }
      case "li": {
        if (listContext.type === "ol") {
          return (
            <View key={index} style={withFont({ flexDirection: "row", marginBottom: 4, display: "flex", alignItems: "center" })}>
              <Text style={withFont(styles.listItemMarker)}>{listContext?.count}.</Text>
              <Text style={withFont(styles.text)}>{children}</Text>
            </View>
          );
        } else if (listContext.type === "ul") {
          return (
            <View key={index} style={withFont({ flexDirection: "row", marginBottom: 4, display: "flex", alignItems: "center" })}>
              <Text style={withFont(styles.listItemMarker)}>{"\u2022"}</Text>
              <Text style={withFont(styles.text)}>{children}</Text>
            </View>
          );
        } else {
          return <Text key={index} style={withFont(styles.text)}>{children}</Text>;
        }
      }
      case "label": {
        return <View key={index} style={withFont(styles.todoContainer)}>{children}</View>;
      }
      case "input": {
        const checked: boolean = node.attribs.disabled !== undefined;
        return <View key={index} style={[styles.checkbox, checked ? styles.checkboxChecked : {}]} />;
      }
      // Added heading support
      case "h1": return <Text key={index} style={withFont(styles.h1)}>{children} </Text>;
      case "h2": return <Text key={index} style={withFont(styles.h2)}>{children} </Text>;
      case "h3": return <Text key={index} style={withFont(styles.h3)}>{children} </Text>;
      case "h4": return <Text key={index} style={withFont(styles.h4)}>{children} </Text>;
      case "h5": return <Text key={index} style={withFont(styles.h5)}>{children} </Text>;
      case "h6": return <Text key={index} style={withFont(styles.h6)}>{children} </Text>;
      default:
        return <Text key={index} style={withFont(styles.text)}>{children}</Text>;
    }
  }

  return null;
}

export default function HtmlToPdf({ html }: { html: string }) {
  const dom = parseDocument(html);
  return <View style={{ fontFamily: "Amiri", width: "100%" }}>{dom.children.map((node, i) => renderNode(node, i))}</View>;
}
