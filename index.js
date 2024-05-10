import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
let blogPosts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { quote: inspQuote });
});

app.post("/posts", (req, res) => {  
    let newPost = {
        "category": req.body.category,
        "compliment": req.body.compliment,
    }
    blogPosts.unshift(newPost);
    res.render("index.ejs", { 
        quote: inspQuote,
        posts: blogPosts 
    });
});

app.post("/edit", (req, res) => {
    const editPostIndex = req.body.postIndex;
    res.render("edit.ejs", { 
        pIndex: editPostIndex,
        postToUpdate: blogPosts[editPostIndex]
    });
});

app.post("/updated", (req, res) => {
    const postToUpdateIndex = req.body.updatedPostIndex;
    if(req.body.updateButton) {
        blogPosts = blogPosts.map((post, index) => { 
            if (index == postToUpdateIndex) {
                return { 
                    ...post, 
                    "category": req.body.updatedCategory,
                    "compliment": req.body.updatedCompliment,
                };
            }
            return post;
        });
    } else if (req.body.deleteButton) {
        blogPosts.splice(postToUpdateIndex, 1);
    }
    res.render("index.ejs", { 
        quote: inspQuote,
        posts: blogPosts 
    });
});

app.listen(port, (req, res) => {
    console.log(`Listening on port ${port}.`);
});

const inspQuotes = [
    "'Believe you can and you're halfway there.' - Theodore Roosevelt",
    "'The only way to do great work is to love what you do.' - Steve Jobs",
    "'You are never too old to set another goal or to dream a new dream.' - C.S. Lewis",
    "'In the middle of difficulty lies opportunity.' - Albert Einstein",
    "'Success is not final, failure is not fatal: It is the courage to continue that counts.' - Winston Churchill",
    "'The only limit to our realization of tomorrow will be our doubts of today.' - Franklin D. Roosevelt",
    "'The future belongs to those who believe in the beauty of their dreams.' - Eleanor Roosevelt",
    "'Happiness is not something readymade. It comes from your own actions.' - Dalai Lama",
    "'The journey of a thousand miles begins with one step.' - Lao Tzu",
    "'Opportunities don't happen, you create them.' - Chris Grosser",
    "'The only way to achieve the impossible is to believe it is possible.' - Charles Kingsleigh (Alice in Wonderland)",
    "'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.' - Albert Schweitzer",
    "'Don't watch the clock; do what it does. Keep going.' - Sam Levenson",
    "'The harder you work for something, the greater you'll feel when you achieve it.' - Unknown",
    "'Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.' - Roy T. Bennett",
    "'The best way to predict the future is to create it.' - Peter Drucker",
    "'No matter how hard the past, you can always begin again.' - Buddha",
    "'It does not matter how slowly you go as long as you do not stop.' - Confucius",
    "'Dream big and dare to fail.' - Norman Vaughan",
    "'Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.' - Christian D. Larson",
    "'Success is not in what you have, but who you are.' - Bo Bennett",
    "'Your time is limited, don't waste it living someone else's life.' - Steve Jobs",
    "'The only person you should try to be better than is the person you were yesterday.' - Unknown",
    "'Be yourself; everyone else is already taken.' - Oscar Wilde",
    "'The secret of getting ahead is getting started.' - Mark Twain",
    "'You miss 100% of the shots you don't take.' - Wayne Gretzky",
    "'Do what you can with all you have, wherever you are.' - Theodore Roosevelt",
    "'Keep your face always toward the sunshine - and shadows will fall behind you.' - Walt Whitman",
    "'The greatest glory in living lies not in never falling, but in rising every time we fall.' - Nelson Mandela",
    "'Success is walking from failure to failure with no loss of enthusiasm.' - Winston Churchill",
    "'It's not whether you get knocked down, it's whether you get up.' - Vince Lombardi",
    "'Every strike brings me closer to the next home run.' - Babe Ruth",
    "'Don't be afraid to give up the good to go for the great.' - John D. Rockefeller",
    "'Challenges are what make life interesting and overcoming them is what makes life meaningful.' - Joshua J. Marine",
    "'You must be the change you wish to see in the world.' - Mahatma Gandhi",
    "'The only impossible journey is the one you never begin.' - Tony Robbins",
    "'The best revenge is massive success.' - Frank Sinatra",
    "'The way to get started is to quit talking and begin doing.' - Walt Disney",
    "'If you want to achieve greatness stop asking for permission.' - Anonymous",
    "'The only person you are destined to become is the person you decide to be.' - Ralph Waldo Emerson",
    "'Great minds discuss ideas; average minds discuss events; small minds discuss people.' - Eleanor Roosevelt",
    "'Live as if you were to die tomorrow. Learn as if you were to live forever.' - Mahatma Gandhi",
    "'Don't let yesterday take up too much of today.' - Will Rogers",
    "'What you get by achieving your goals is not as important as what you become by achieving your goals.' - Zig Ziglar",
    "'Life is 10% what happens to us and 90% how we react to it.' - Charles R. Swindoll",
    "'The only limit to our realization of tomorrow will be our doubts of today.' - Franklin D. Roosevelt",
    "'The journey of a thousand miles begins with one step.' - Lao Tzu",
    "'You don't have to be great to start, but you have to start to be great.' - Zig Ziglar",
    "'The greatest glory in living lies not in never falling, but in rising every time we fall.' - Nelson Mandela",
    "'In the end, it's not the years in your life that count. It's the life in your years.' - Abraham Lincoln"
];

const inspQuote = inspQuotes[(Math.round(Math.random()*50))];