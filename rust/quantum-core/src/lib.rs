//! H → P(phase) → dephasing(visibility) → optional H → measurement.
//! Visibility multiplies the density matrix's off-diagonal elements.
#[no_mangle]
pub extern "C" fn probability_zero(phase: f64, visibility: f64, recombine: i32) -> f64 {
    if !phase.is_finite() || !visibility.is_finite() || !(0.0..=1.0).contains(&visibility) {
        return f64::NAN;
    }
    if recombine == 0 { return 0.5; }
    ((1.0 + visibility * phase.cos()) / 2.0).clamp(0.0, 1.0)
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::f64::consts::PI;
    #[test]
    fn interference_extrema() {
        assert_eq!(probability_zero(0.0, 1.0, 1), 1.0);
        assert!(probability_zero(PI, 1.0, 1).abs() < 1e-14);
        assert!((probability_zero(PI/2.0, 1.0, 1)-0.5).abs()<1e-14);
    }
    #[test]
    fn dephasing_and_no_recombination() {
        for n in 0..360 {
            let phi = (n as f64).to_radians();
            assert_eq!(probability_zero(phi, 0.0, 1), 0.5);
            assert_eq!(probability_zero(phi, 1.0, 0), 0.5);
            for v in [0.0, 0.25, 0.75, 1.0] {
                let p = probability_zero(phi, v, 1);
                assert!((0.0..=1.0).contains(&p));
                assert!((p + probability_zero(phi+PI, v, 1)-1.0).abs()<1e-12);
            }
        }
    }
    #[test]
    fn invalid_inputs() {
        assert!(probability_zero(f64::NAN, 1.0, 1).is_nan());
        assert!(probability_zero(0.0, -1.0, 1).is_nan());
    }
}
