import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  title,
  description,
  imgUrl,
  price,
  createdAt,
}: {
  id: number;
  title: string;
  description: string;
  imgUrl: string | undefined;
  price: number;
  createdAt: Date;
}) => {
  return (
    <Link
      to={`/course/${id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={title} subheader={createdAt.toDateString()} />
        <CardMedia
          component="img"
          height="194"
          image={imgUrl}
          alt={`${title} image`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="h6" color="text.secondary" marginTop={1}>
            {`$${price}`}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
