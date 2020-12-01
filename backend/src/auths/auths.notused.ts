// Utilities not used

  

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