import { Accordion } from "react-bootstrap";
import { ItemSerieFeatures } from "../../api/client/GalaJewerlyClient";

type ItemSerieListTagsProps = {
  tags: ItemSerieFeatures[];
};

const ItemSerieListTags = ({ tags }: ItemSerieListTagsProps) => {
  return (
    <div>
      {tags?.map((tag, tagIndex) => {
        return (
          <Accordion defaultActiveKey="0" flush key={tagIndex + "tag"}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{tag.featureName}</Accordion.Header>
              <Accordion.Body>
                <div className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <label className="custom-control-label">{tag.value}</label>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </div>
  );
};

export default ItemSerieListTags;
