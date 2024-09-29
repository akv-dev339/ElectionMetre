// src/components/HomePage.js
import React from 'react';
import './Homepage.css'
import { Card, CardContent, CardMedia, Button, Typography } from '@mui/material';
import {Link} from 'react-router-dom'

const HomePage = () => {
  return (  
    <div className='heading'>
      <h1>Election Result Analysis Project</h1>
      <p>Welcome to the election result analysis tool. The goal of this project is to analyze the impact of newly added and deleted voters on the election results of the 2023 Assembly Election in Madhya Pradesh. By comparing the booth-level voting data from the 2023 election with the previous election and incorporating data on voter additions and deletions,  aim to understand how changes in voter demographics influence electoral outcomes.</p>
      <div className='card'>
      <Card sx={{ maxWidth: 345, margin: '0 auto', boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="140"
          image='https://images.ctfassets.net/lzny33ho1g45/5FH7fLMZABa2N5O25hniRV/e980968e81b8bcda2bebffc98736e47a/Data_analysis_hero.jpg?w=1520&fm=avif&q=30&fit=thumb&h=760'
          alt="Election Analysis"
        />
        <CardContent>
          <Typography variant="h5" component="div">
           Overview
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Explore detailed analysis of election results based on voter changes. Click below to see the analysis with boothId.
          </Typography>
        </CardContent>
       <Link to='/analysispage'><Button  variant="contained" color="primary" fullWidth>
          See Analysis
        </Button></Link> 
      </Card>
      </div>
    </div>
  );
};

export default HomePage;

