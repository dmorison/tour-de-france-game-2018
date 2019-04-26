library(shiny)
library(DT)

fluidPage(
  
  tags$head(
    tags$style(HTML("
      .datatables {margin-bottom: 12px;}
    "))
  ),
  
  DT::dataTableOutput('riderNameResults'),
  #DT::dataTableOutput('finalOverallResults'),
  DT::dataTableOutput('playerStWinners'),
  DT::dataTableOutput('playersStScores'),
  DT::dataTableOutput('leaderboard'),
  
  plotOutput('wormChart'),
  
  DT::dataTableOutput('playersTeams')
  
)
