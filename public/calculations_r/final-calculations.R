### FINAL STAGE CALCULATIONS
setwd("C:/Users/davem/coding_2018/tour-de-france-game-2018/public/calculations_r")

df_start_list <- read.csv("start-list_2017.csv")

overall_prizes <- c("First", "Second", "Third", "Green jersey", "Polka dot jersey", "White jersey", "Super combative",
                    "Final stage winner", "Overall winning team", "Lanten Rouge")
scores <- c(10, 6, 4, 3, 3, 3, 2, 3, 3, 5)

stage <- "Overall"
### Lookup overall classification
df_start_list[grep("Row", df_start_list$Rider), ]

oa_rider_name_results <- c("Chris Froome (GBr)", "Rigoberto Uran (Col)", "Romain Bardet (Fra)",
                           "Michael Matthews (Aus)", "Warren Barguil (Fra)", "Simon Yates (GBr)",
                           "Warren Barguil (Fra)", "Dylan Groenewegen (Ned)", "Sky", "Luke Rowe (GBr)")
oa_rider_code_results <- c("rd001", "rd088", "rd041",
                           "rd111", "rd113", "rd201",
                           "rd113", "rd054", "SKY", "rd007")

df_rider_name_overall <- data.frame(Award = overall_prizes, Rider = oa_rider_name_results,
                                    Points = scores)
write.csv(df_rider_name_overall, file = "rider_name_overall.csv", row.names = FALSE)
### CALCULATION
df_players <- read.csv("players-codes.csv")
df_players_results <- read.csv("players-stage-results.csv")
### REMEMBER TO SKIP THIS FOR FIRST STAGE!!!
df_player_st_winners <- read.csv("player-st-winners.csv")
###
oa_results <- apply(df_players[, 2:8], 1, function(x){ sum(scores[which(oa_rider_code_results %in% x)]) })
oa_results_df <- cbind(df_players_results, oa_results)

oa_player_topscore <- max(oa_results)
oa_player_winner <- as.character(oa_results_df[which(oa_results_df$oa_results == oa_player_topscore), "Players"])
if (length(oa_player_winner) > 1) {
  oa_player_winner <- paste(oa_player_winner, collapse = ', ')
}
row_oa_player_winner <- c(stage, oa_player_winner, oa_player_topscore)

df_player_st_winners[] <- lapply(df_player_st_winners, as.character)
update_df_player_st_winners <- rbind(row_oa_player_winner, df_player_st_winners)
write.csv(update_df_player_st_winners, file = "player-st-winners.csv", row.names = FALSE)

colnames(oa_results_df)[ncol(oa_results_df)] <- stage
write.csv(oa_results_df, file = "players-stage-results.csv", row.names = FALSE)

if(ncol(oa_results_df) > 2) {
  player_totals <- apply(oa_results_df[, 2:ncol(oa_results_df)], 1, function(x){ sum(x) })
} else {
  player_totals <- oa_results
}
player_totals_df <- data.frame(Players = oa_results_df$Players, Total_score = player_totals)
player_totals_df <- player_totals_df[order(-player_totals_df$Total_score), ]
write.csv(player_totals_df, file = "players-leaderboard.csv", row.names = FALSE)

players_stage_accum <- read.csv("players-accum-stage-results.csv")
oa_accum_df <- cbind(players_stage_accum, player_totals)
colnames(oa_accum_df)[ncol(oa_accum_df)] <- stage
write.csv(oa_accum_df, file = "players-accum-stage-results.csv", row.names = FALSE)