import React from "react";
import "./styles/LinksPreview.scss";

const LinksPreview = props => {
  const { link } = props;

  const checkUrl = (link && link.match(/\b(http|https)?:\/\/\S+/gi)) || [];

  //const preview = checkUrl.map(url => <MicrolinkCard url={url} />);
  const preview = checkUrl.map(url => (
    <>
      <a className="previewLink" href={url} target="_blank">
        Sent a link!
      </a>
      <iframe className="previewDetails" src={url} />
    </>
  ));

  return <div className="linksPreview">{preview}</div>;
};

export default LinksPreview;
