export const rupees = "";

export const baseUrl = "https://admin.5starxxx.com";
export const fron_end_main_domain = "https://5starxxx.com";

export const domain = "http://192.168.18.183:9002";
// export const domain ="http://192.168.18.183:9002/"
export const domainn = "http://192.168.18.183:9002"
export const domain1 = "https://api.5starxxx.com"


export const download_app_url = ""
export const support_mail = "";
// `support@sunlottrey.fun`;
export const telegram_url =``;

export const endpoint = {
  login: `${domain1}/api/v1/login`,
  my_hisory: `${domain1}/api/v1/getMyHistory`,
  send_otp: `${baseUrl}/api/forget-password`,
  veryfy_otp: `${baseUrl}/api/user-otp-verify`,
  signup: `${baseUrl}/api/user_register`,
  userwallet: `${baseUrl}/api/userwallet`,
  // top11winner: `https://game-zone-sql.onrender.com/api/v1/topw11winningInformation`,
  top11winner: `${baseUrl}/api/winning-list`,
  openbannerUrl: `${baseUrl}/popup`,
  profiledata: `${baseUrl}/api/profileapi`,
  applybet: `${baseUrl}/api/bet`,
  game_history: `${baseUrl}/api/colour_result`,
  my_history: `${baseUrl}/api/getbet`,
  my_history_all: `${baseUrl}/api/getbet-game-results`,
  check_result: `${baseUrl}/api/checkresult`,
  color_winning: `${baseUrl}/api/colour_winning`,
  cash_deposit: `${baseUrl}/api/deposit`,
  payment_url: "https://vpayout.com/Upi_controller/insert_fund_request_online",
  withdraw_payment: `${baseUrl}/api/payout-request`,
  get_name_by_referral_code: `${baseUrl}/api/get-user-reffral-name`,
  payment_request: `${baseUrl}/api/deposit-request`,
  registration_bonus: `${baseUrl}/api/welcom-bonus`,
  deposit_history: `${baseUrl}/api/deposit-history`,
  withdrawl_history: `${baseUrl}/api/withdrawl-history`,
  deposit_bonus: `${baseUrl}/api/deposit-bonus`,
  referral_bonus: `${baseUrl}/api/refral-bonus`,
  bet_reffral: `${baseUrl}/api/bet-reffral`,
  daily_self_bet_income: `${baseUrl}/api/daily-self-bet-income`,
  daily_wallet_income: `${baseUrl}/api/daily-wallet-income`,
  daily_salary_income: `${baseUrl}/api/daily-salay-income`,
  team_reward_bonus: `${baseUrl}/api/team-reward-bonus`,
  team_trading_bonus: `${baseUrl}/api/team-trading-bonus`,
  add_bank_details: `${baseUrl}/api/bank-add`,
  get_bank_list: `${baseUrl}/api/user-bank-details`,
  promotion_data: `https://promotion-page-data-roulete-game.onrender.com/api/v1/promotiondata`,
  all_withdrawl_user_list: `${baseUrl}/api/widthrol-user-list`,
  recharge_call_bakc: `${baseUrl}/api/deposits-user-request`,
  cricket_get_url_id_pass: `${baseUrl}/api/cricket-details`,
  // trx api's
  trx_game_history: `${baseUrl}/api/trx-auto-genrated-result`,
  trx_game_bet: `${baseUrl}/api/trx-bet`,
  my_history_all_trx: `${baseUrl}/api/trx-getColourBets`,
  my_history_all_trx_pending: `${baseUrl}/api/trx-getColourBets-results`,
  // aviator api's
  aviator_login: `${baseUrl}/api/aviator/login`,
  get_data_by_user_id: `${baseUrl}/api/userProfile`,
  aviator_result: `${baseUrl}/api/aviator/result_cron`,
  total_bet_history: `${baseUrl}/api/aviator/total-bet-histroy`,
  bet_history: `${baseUrl}/api/aviator/bet_histroy`,
  result: `${baseUrl}/api/aviator/result`,
  wallet_data: `${baseUrl}/api/aviator/userwallet`,
  bet_now: `${baseUrl}/api/aviator/bet_now`,
  cash_out: `${baseUrl}/api/aviator/cash_out`,
  callback_response:`${baseUrl}/api/deposit-collback`,
  level_team:`${baseUrl}/api/view-Level-team`,
  level_income:`${baseUrl}/api/view-Level-income`,
  rollet: {
    logout:baseUrl + "/api/roulette-logout",
    login: baseUrl + "/api/roulette-login",
    bet_now: domain1 + "/api/v1/betPlacedRoulette",
    profile: baseUrl + "/api/roulette-profile",
    // game_result: baseUrl + "/api/roulette-results-history",
  },

  node:{
    get_wallet:domain1+"/api/v1/balance",
    history_my: domain1 + "/api/v1/getMyHistory",
     game_result: domainn + "/api/v1/getRouletteGameHistory",
     bet_satta: domainn + "/api/v1/betPlacedSatta",
    satta_game_Lastfour: domainn + "/api/v1/getSattaGameHistoryLastFour",
    satta_game_gamehistory: domainn + "/api/v1/getSattaGameHistory",
    satta_game_myhistory: domainn + "/api/v1/getSattaMyHistory",
    
     
  }
};
