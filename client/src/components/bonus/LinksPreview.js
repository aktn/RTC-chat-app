import React from "react";
import MicrolinkCard from "@microlink/react";

const LinksPreview = props => {
  const { link } = props;

  const checkUrl = (link && link.match(/\b(http|https)?:\/\/\S+/gi)) || [];

  const preview = checkUrl.map(url => <MicrolinkCard url={url} />);

  return <div>{preview}</div>;
};

export default LinksPreview;
