import React from "react";
import { Text, View, StyleSheet, Link } from "@react-pdf/renderer";
import { parseDocument } from "htmlparser2";

type IListContext = {
  type: string;
  count?: number;
};

const styles = StyleSheet.create({
  ol: {
    marginBottom: 8,
    paddingLeft: 14,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  ul: {
    marginBottom: 8,
    paddingLeft: 14,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  li: { marginBottom: 4, padding: 15 },
  listItemMarker: { width: 14, fontSize: 12 },
  text: { fontSize: 12 },
  strong: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecoration: "underline" },
  link: { color: "blue", textDecoration: "underline" },
  todoContainer: { flexDirection: "row", alignItems: "center" },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginRight: 6,
  },
  checkboxChecked: {
    backgroundColor: "#000",
  },
  todoText: { flex: 1 },
});

function renderNode(
  node: any,
  index: number,
  listContext: IListContext = {} as IListContext
) {
  // listContext to keep track of ordered list count & type, for numbering

  if (typeof node === "string") {
    return <Text key={index}>{node}</Text>;
  }

  if (node.type === "text") {
    return <Text key={index}>{node.data}</Text>;
  }

  if (node.type === "tag") {
    const children = node.children
      ? node.children.map((child: any, i: number) =>
          renderNode(child, i, listContext)
        )
      : null;

    switch (node.name) {
      case "p":
        return (
          <Text key={index} style={styles.text}>
            {children}
          </Text>
        );

      case "strong":
      case "b":
        return (
          <Text key={index} style={styles.strong}>
            {children}
          </Text>
        );

      case "i":
      case "em":
        return (
          <Text key={index} style={styles.italic}>
            {children}
          </Text>
        );

      case "u":
        return (
          <Text key={index} style={styles.underline}>
            {children}
          </Text>
        );

      case "a":
        return (
          <Link key={index} src={node.attribs.href} style={styles.link}>
            {children}
          </Link>
        );

      case "ol": {
        // Track list item count
        let count = 1;
        const newContext = { ...listContext, type: "ol" };
        return (
          <View key={index} style={styles.ol}>
            {node.children.map((child: any, i: number) => {
              if (child.name === "li") {
                return renderNode(child, i, { ...newContext, count: count++ });
              }
              return null;
            })}
          </View>
        );
      }

      case "ul": {
        // Support special todo list class (checkbox)
        return (
          <View key={index} style={styles.ul}>
            {node.children.map((child: any, i: number) => {
              if (child.name === "li") {
                return renderNode(child, i, { type: "ul" });
              }
              return null;
            })}
          </View>
        );
      }

      case "li": {
        if (listContext.type === "ol") {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text style={styles.listItemMarker}>{listContext?.count}.</Text>
              <Text style={styles.text}>{children}</Text>
            </View>
          );
        } else if (listContext.type === "ul") {
          return (
            <View
              key={index}
              style={{
                flexDirection: "row",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Text style={styles.listItemMarker}>{"\u2022"}</Text>
              <Text style={styles.text}>{children}</Text>
            </View>
          );
        } else {
          return (
            <Text key={index} style={styles.text}>
              {children}
            </Text>
          );
        }
      }

      case "label": {
        // For todo-list label (checkbox container)
        // Usually contains input and possibly text
        return (
          <View key={index} style={styles.todoContainer}>
            {children}
          </View>
        );
      }

      case "input": {
        // Checkbox in todo list
        // Check if disabled attribute to decide checked/unchecked
        const checked: boolean = node.attribs.disabled !== undefined;
        return (
          <View
            key={index}
            style={[styles.checkbox, checked ? styles.checkboxChecked : {}]}
          />
        );
      }

      default:
        // Default fallback - render children
        return (
          <Text key={index} style={styles.text}>
            {children}
          </Text>
        );
    }
  }

  return null;
}


// Main component

export default function HtmlToPdf({ html }: { html: string }) {
  const dom = parseDocument(html);

  return <View>{dom.children.map((node, i) => renderNode(node, i))}</View>;
}
