import React from 'react'
import { makeStyles } from '@material-ui/core'
import IntrinsicGreenPower from './IntrinsicGreenPower'
import ControlledLoad from './ControlledLoad'
import EnergyPlanIncentive from './EnergyPlanIncentive'
import EnergyPlanDiscount from './EnergyPlanDiscount'
import EnergyPlanGreenPowerCharge from './EnergyPlanGreenPowerCharge'
import EnergyPlanEligibility from './EnergyPlanEligibility'
import EnergyPlanFee from './EnergyPlanFee'
import EnergyPlanSolarFeedInTariff from './EnergyPlanSolarFeedInTariff'
import EnergyPlanTariffPeriod from './EnergyPlanTariffPeriod'
import Duration from '../Duration'

const useStyles = makeStyles(() => ({
  sectionTitle: {
    fontStyle: 'italic'
  },
  sectionContent: {
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 20
  }
}))

const PlanContract = ({contract}) => {
  const classes = useStyles()
  const {additionalFeeInformation, pricingModel, timeZone, isFixed, variation, onExpiryDescription, paymentOption,
    intrinsicGreenPower, controlledLoad, incentives, discounts, greenPowerCharges, eligibility, fees, solarFeedInTariff,
    tariffPeriod, termType, benefitPeriod, terms, meterTypes, coolingOffDays, billFrequency} = contract
  return (
    <>
      {additionalFeeInformation && (
        <div>Additional Fee Information: <span>{additionalFeeInformation}</span></div>
      )}
      <div>Pricing Model: <span>{pricingModel}</span></div>
      <div>Time Zone: <span>{timeZone || 'AEST'}</span></div>
      <div>Is Fixed: <span>{isFixed + ''}</span></div>
      {variation && (
        <div>Variation: <span>{variation}</span></div>
      )}
      {onExpiryDescription && (
        <div>On Expiry Description: <span>{onExpiryDescription}</span></div>
      )}
      <div>Payment Option: {paymentOption.join(', ')}</div>
      {intrinsicGreenPower && (
        <>
          <div className={classes.sectionTitle}>Intrinsic Green Power:</div>
          <div className={classes.sectionContent}>
            <IntrinsicGreenPower intrinsicGreenPower={intrinsicGreenPower} />
          </div>
        </>
      )}
      {controlledLoad && (
        <>
          <div className={classes.sectionTitle}>Controlled Load:</div>
          <ul className={classes.sectionContent}>
            {controlledLoad.map((cl, index) => <ControlledLoad controlledLoad={cl} key={index} />)}
          </ul>
        </>
      )}
      {incentives && (
        <>
          <div className={classes.sectionTitle}>Incentives:</div>
          <ul className={classes.sectionContent}>
            {incentives.map((incentive, index) => <EnergyPlanIncentive incentive={incentive} key={index} />)}
          </ul>
        </>
      )}
      {discounts && (
        <>
          <div className={classes.sectionTitle}>Discounts:</div>
          <ul className={classes.sectionContent}>
            {discounts.map((discount, index) => <EnergyPlanDiscount discount={discount} key={index} />)}
          </ul>
        </>
      )}
      {greenPowerCharges && (
        <>
          <div className={classes.sectionTitle}>Green Power Charges:</div>
          <ul className={classes.sectionContent}>
            {greenPowerCharges.map((greenPowerCharge, index) => <EnergyPlanGreenPowerCharge greenPowerCharge={greenPowerCharge} key={index} />)}
          </ul>
        </>
      )}
      {eligibility && (
        <>
          <div className={classes.sectionTitle}>Eligibility:</div>
          <ul className={classes.sectionContent}>
            {eligibility.map((el, index) => <EnergyPlanEligibility eligibility={el} key={index} />)}
          </ul>
        </>
      )}
      {fees && (
        <>
          <div className={classes.sectionTitle}>Fees:</div>
          <ul className={classes.sectionContent}>
            {fees.map((fee, index) => <EnergyPlanFee fee={fee} key={index} />)}
          </ul>
        </>
      )}
      {solarFeedInTariff && (
        <>
          <div className={classes.sectionTitle}>Solar Feed-in Tariff:</div>
          <ul className={classes.sectionContent}>
            {solarFeedInTariff.map((tariff, index) => <EnergyPlanSolarFeedInTariff solarFeedInTariff={tariff} key={index} />)}
          </ul>
        </>
      )}
      <>
        <div className={classes.sectionTitle}>Tariff Period:</div>
        <ul className={classes.sectionContent}>
          {tariffPeriod.map((period, index) => <EnergyPlanTariffPeriod tariffPeriod={period} key={index} />)}
        </ul>
      </>
      {termType && (
        <div>Term Type: <span>{termType}</span></div>
      )}
      {benefitPeriod && (
        <div>Benefit Period: <span>{benefitPeriod}</span></div>
      )}
      {terms && (
        <div>Terms: <span>{terms}</span></div>
      )}
      {meterTypes && (
        <div>Meter Types: <span>{meterTypes.join(', ')}</span></div>
      )}
      {coolingOffDays && (
        <div>Cooling Off: <span>{coolingOffDays} days</span></div>
      )}
      <div>
        Bill Frequency:
        <span>
          {billFrequency.map((billingSchedule, index) => (<>{!!index && <>, </>}<Duration value={billingSchedule} /></>))}
        </span>
      </div>
    </>
  )
}

export default PlanContract
