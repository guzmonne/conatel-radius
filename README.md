### Solution to run multiple SSIDs against the same Radius DB.

_Source: https://community.ubnt.com/t5/UniFi-Wireless/Multiple-SSID-s-with-WPA-Enterprise/td-p/446927_

<quote>
  This isn't actually all that hard in Windows NPS.  I have two separate SSIDs, on separate VLANs, with different user bases allowed to connect to each SSID (Though they're all within a single AD tree).
  
  One SSID is open to all domain users, so that's pretty simple.  The other si only open to a certain subset of users, who need priority access for business needs (We're on the end of a very narrow bandwidth satellite link).
  
  The trick to this is to create two network policies, one for each SSID.  This is under NPS->Policy->Network Policies
  
  In addition to the usual NAS Port Type and Windows Groups, which dictate which users can connect, you add a third condition which tests against "Called Station ID" and then do a regular expression to match the SSID that this policy applies to.  In my case, the regular expression is .*:Business$ which will cause the policy to only apply on requests coming from the Business SSID.
  
  I then have one policy for each of the SSIDs, each with different groups allowed to authenticate.
</quote>

### Configure Microsot NPS to authenticate clients depending on the "Call Station ID" or "NAS-ID"

_Source: http://wifinigel.blogspot.com.uy/2014/03/the-microsoft-network-policy-server-nps.html_
