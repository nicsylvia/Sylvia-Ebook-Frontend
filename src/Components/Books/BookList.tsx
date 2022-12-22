import React, { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import styled from "styled-components";
import pic from "../Assets/devNet.png";
import { Link } from "react-router-dom"
import axios from 'axios';

interface Data{
  _id: string
    author: string,
    tittle: string,
    coverImage: string,
    views: string[],
    authorImage: string,
    category: string,
}

const BookList = () => {

	// STATES FOR READDATA FUNCTION
  const [bookData, setBookData] = useState<Data[]>([]);

//   STATES FOR LOADING FUNCTION
  const [isLoading, setIsLoading] = useState(true);

//   STATES FOR IP FUNCTION
  const [ipState, setIpState] = useState("")

//   Consuming API FOR GETTING/READING FROM API
  const ReadData = async() =>{
    axios.get("http://localhost:2100/api/getbooks").then((res) =>{
      setIsLoading(false);
      setBookData(res.data.data)
    }
    ).catch((err) =>{
        return err;
      }
    )
  };

//   FUNCTION FOR GETTING VIEWS OF USERS
const ReadIpAddress = async() =>{
	await axios.get("https://geolocation-db.com/json/a5f3c240-7310-11ed-8abc-5520d31fdee7").then((res) =>{
		setIpState(res.data.IP5v4);
	}).catch((err) =>{
		return err
	})
};

// FUNCTION FOR STORING THE VIEWS OF USERS WHEN THEY VIEW A BOOK
const StoreViews = async (id: string) =>{
	await axios.patch(`http://localhost:2100/api/views/${id}`, {ip: ipState}).then((res) =>{
		console.log(res);
	})
};

  
  React.useEffect(() =>{
    ReadData();
	ReadIpAddress();
  }, []);

	return (
		<Container>
      {
        isLoading ? <p>Loading.......</p> : null
      }
			
      {
        bookData?.map((books) =>(
          <Link to = {`/books/${books._id}/details`} style = {{textDecoration: "none"}}>
		  		<Card key={books._id}>
					<ImageHolder>
						<Image src={books.coverImage} />
						<Cont>
							<Button>{books.category}</Button>

							<TitleHold>
								<Title>{books.tittle}</Title>
							</TitleHold>
						</Cont>
					</ImageHolder>
			

				<DownPart>
					<Hold>
						<AuthorImage>{books.authorImage}</AuthorImage>
						<AuthName>{books.author}</AuthName>
					</Hold>
					<ViewIcon>
						<AiOutlineEye />
						<span>19K</span>
					</ViewIcon>
				</DownPart>
				<HoverCard>
				<First>
					<Hold>
						<AuthorImage>{books.authorImage}</AuthorImage>
						<AuthName>{books.author}</AuthName>
					</Hold>
					<But>+ View</But>
				</First>
				<Second>
					<MainImage src={books.coverImage} />
					<MainImage src={books.coverImage} />
					<MainImage src={books.coverImage} />
				</Second>
			</HoverCard>
			</Card>
		  </Link>
        ))
      }
				
			
		</Container>
	);
};

export default BookList;

const HoverCard = styled.div`
	height: 150px;
	width: 100%;
	/* background-color: red; */
	position: absolute;
	display: flex;
	flex-direction: column;
	top: 10px;
	border-radius: 5px;
	background-color: white;
	box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
	padding: 20px;
	z-index: 1;
	display: none;
	/* display: block; */
`;

const Hold = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	width: 100%;
`;
const MainImage = styled.img`
	height: 100px;
	width: 100px;
	border-radius: 5px;
	background-color: gray;
	margin-right: 5px;
	object-fit: cover;
`;
const First = styled.div`
	display: flex;
`;
const AuthImage = styled.div``;
const Name = styled.div``;
const But = styled.div`
	height: 30px;
	width: 120px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: silver;
	border-radius: 5px;
`;
const Second = styled.div`
	display: flex;
	margin-top: 20px;
`;

const Image = styled.img`
	height: 100%;
	width: 100%;
	object-fit: cover;
	border-radius: 5px;
`;

const Container = styled.div`
	margin-top: 30px;
	padding-bottom: 30px;
	padding: 20px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	/* align-items: center; */
`;
const Card = styled.div`
	width: 300px;
	position: relative;
	margin: 10px;
`;

const Title = styled.div`
	display: flex;
	position: absolute;
	bottom: 10px;
	margin-left: 10px;
	font-size: 18px;
`;
const TitleHold = styled.div`
	opacity: 0;
	height: 150px;
	color: white;
	display: flex;
	transition: all 350ms;
	border-radius: 5px;
	/* background-color: red; */
	background-image: linear-gradient(
		0deg,
		rgba(65, 73, 73, 1) 0%,
		rgba(253, 187, 45, 0) 100%
	);
	position: relative;
	:hover {
		opacity: 1;
	}
	/* display: none; */
`;
const ImageHolder = styled.div`
	height: 200px;
	width: 100%;
	background-color: silver;
	position: relative;
	cursor: pointer;
	border-radius: 5px;
`;
const DownPart = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10px;
	&:hover ~ ${HoverCard} {
		display: flex;
	}
`;
const Cont = styled.div`
	position: absolute;
	height: 200px;
	width: 100%;
	/* background-color: red; */
	top: 0;
`;
const Button = styled.div`
	margin: 10px;
	background-color: #302f3e;
	width: 130px;
	height: 35px;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
	border-radius: 20px;
`;

const AuthorImage = styled.div`
	height: 30px;
	width: 30px;
	border-radius: 50%;
	background-color: #bb3d6e;
	display: flex;
	justify-content: center;
	align-items: center;
	color: white;
	font-weight: bold;
	margin-right: 10px;
`;
const AuthName = styled.div`
	font-weight: bold;
	color: black;
`;
const ViewIcon = styled.div`
	display: flex;
	align-items: center;
	font-size: 13px;
	color: gray;
	span {
		color: black;
	}
`;