// Utilities not used

  // Generate the expiration time of the JWT token
  // async jwtTokenExpiration() {
  //   const hoursToAdd = Number(this.configService.get<number>("JWT_VALIDITY_DURATION_HOURS"));
  //   const currentDate = new Date();
  //   const jwtTokenExpirationDate =  new Date(currentDate.getTime()+ (hoursToAdd*60*60*1000));
  //   return jwtTokenExpirationDate
  // }

  // Fetch the token from DB to verify it's valid
  // async verifyDBTokenMatch(tokenId) {       
  //     const fetchedToken = await this.prismaService.token.findUnique({
  //         where: {
  //             id: tokenId,
  //         },
  //         include: {
  //             user: true,
  //         },
  //     });
  //     // Check if token could be found in database and is valid
  //     if (!fetchedToken || !fetchedToken?.valid) {
  //         return { isValid: false, errorMessage: 'Invalid Token' }
  //     }
  //     // Check token expiration
  //     if (fetchedToken.expiration < new Date()) {
  //         return { isValid: false, errorMessage: 'Token expired' }
  //     }
  //     // Token is valid return credential
  //     return {
  //         isValid: true,
  //         credentials: {
  //             tokenId: tokenId,
  //             userId: fetchedToken.userId,
  //             isAdmin: fetchedToken.user.isAdmin,
  //         },
  //     }
  // }