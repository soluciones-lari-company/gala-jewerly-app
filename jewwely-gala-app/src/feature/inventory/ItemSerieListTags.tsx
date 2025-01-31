import { Badge } from "react-bootstrap";
import { ItemSerieFeatures } from "../../api/client/GalaJewerlyClient";

type ItemSerieListTagsProps = {
    tags: ItemSerieFeatures[];
}

const ItemSerieListTags = ({tags}: ItemSerieListTagsProps) => {

    return (
        <div>
        {tags?.map((tag, tagIndex) => {
          return (
            <Badge pill bg="dark" key={tagIndex + "tag"} className="mb-1 mr-1">
              {tag.featureName} | {tag.value}
              <i
                className="bi bi-x-circle-fill ms-2"
                role="button"
              >
                x
              </i>
            </Badge>
          );
        })}
      </div>
    )
}

export default ItemSerieListTags