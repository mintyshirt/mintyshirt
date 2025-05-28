      const request = await licenseManager.getLicenseRequest(requestId);
      expect(request.status).to.equal(1); // APPROVED
      
      const license = await licenseManager.getLicense(requestId);
      expect(license.active).to.be.true;
      expect(license.expiryDate).to.be.gt(0);
    });

    it("Devrait permettre au propriétaire de l'IP de rejeter une demande", async function () {
      await licenseManager.connect(creator1).rejectLicenseRequest(requestId);